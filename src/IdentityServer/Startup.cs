using System.Linq;
using System.Reflection;
using System.Security.Claims;
using IdentityServer.Data;
using IdentityServer4.Configuration;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace IdentityServer
{
    public class Startup
    {
        public IWebHostEnvironment Environment { get; }

        public Startup(IWebHostEnvironment environment)
        {
            Environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;
            var databaseName = "IdentityDatabase";
            var connectionString =
                @"Data Source=(LocalDb)\MSSQLLocalDB;database=VueDemo.IdentityServer;trusted_connection=yes;";

            services.AddDbContext<ApplicationDbContext>(builder =>
            {
                if (Environment.IsDevelopment())
                {
                    builder.UseInMemoryDatabase(databaseName);
                }
                else
                {
                    builder.UseSqlServer(connectionString,
                        sqlOptions => sqlOptions.MigrationsAssembly(migrationsAssembly));
                }
            });

            services
                .AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            var identityServerBuilder = services.AddIdentityServer(options =>
                {
                    // see https://identityserver4.readthedocs.io/en/latest/topics/resources.html
                    options.EmitStaticAudienceClaim = true;
                })
                .AddConfigurationStore(options =>
                {
                    if (Environment.IsDevelopment())
                    {
                        options.ConfigureDbContext = b => b.UseInMemoryDatabase(databaseName);
                    }
                    else
                    {
                        options.ConfigureDbContext = b => b.UseSqlServer(connectionString,
                            sqlOptions => sqlOptions.MigrationsAssembly(migrationsAssembly));
                    }
                })
                .AddOperationalStore(options =>
                {
                    if (Environment.IsDevelopment())
                    {
                        options.ConfigureDbContext = b => b.UseInMemoryDatabase(databaseName);
                    }
                    else
                    {
                        options.ConfigureDbContext = b => b.UseSqlServer(connectionString,
                            sqlOptions => sqlOptions.MigrationsAssembly(migrationsAssembly));
                    }
                })
                .AddAspNetIdentity<IdentityUser>();

            //.AddTestUsers(Config.Testusers.ToList())
            //.AddInMemoryIdentityResources(Config.IdentityResources)
            //.AddInMemoryApiScopes(Config.ApiScopes)
            //.AddInMemoryClients(Config.Clients);

            //dotnet ef migrations add InitialApplicationDbMigration -c ApplicationDbContext -o Data/Migrations/Application/ApplicationDb
            //dotnet ef migrations add InitialIdentityServerPersistedGrantDbMigration -c PersistedGrantDbContext -o Data/Migrations/IdentityServer/PersistedGrantDb
            //dotnet ef migrations add InitialIdentityServerConfigurationDbMigration -c ConfigurationDbContext -o Data/Migrations/IdentityServer/ConfigurationDb

            // not recommended for production - you need to store your key material somewhere secure
            identityServerBuilder.AddDeveloperSigningCredential();

            if (Environment.IsProduction())
            {
                services.AddApplicationInsightsTelemetry();
            }

        }

        public void Configure(IApplicationBuilder app)
        {
            InitializeDatabase(app);

            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();
            app.UseRouting();

            app.UseIdentityServer();

            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapDefaultControllerRoute(); });
        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();

            var persistedGrantDbContext = serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>();
            var configurationDbContext = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
            var applicationDbContext = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            if (!persistedGrantDbContext.Database.IsInMemory())
                persistedGrantDbContext.Database.Migrate();

            if (!configurationDbContext.Database.IsInMemory())
                configurationDbContext.Database.Migrate();

            if (!applicationDbContext.Database.IsInMemory())
                applicationDbContext.Database.Migrate();

            if (!configurationDbContext.Clients.Any())
            {
                foreach (var client in Config.Clients)
                {
                    configurationDbContext.Clients.Add(client.ToEntity());
                }

                configurationDbContext.SaveChanges();
            }

            if (!configurationDbContext.IdentityResources.Any())
            {
                foreach (var resource in Config.IdentityResources)
                {
                    configurationDbContext.IdentityResources.Add(resource.ToEntity());
                }

                configurationDbContext.SaveChanges();
            }

            if (!configurationDbContext.ApiResources.Any())
            {
                foreach (var resource in Config.Apis)
                {
                    configurationDbContext.ApiResources.Add(resource.ToEntity());
                }

                configurationDbContext.SaveChanges();
            }

            if (!configurationDbContext.ApiScopes.Any())
            {
                foreach (var scope in Config.ApiScopes)
                {
                    configurationDbContext.ApiScopes.Add(scope.ToEntity());
                }

                configurationDbContext.SaveChanges();
            }

            var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
            var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            var defaultRole = new IdentityRole("users");
            var defaultClaim = new Claim("api1", "true");

            if (!roleManager.Roles.Any())
            {
                AsyncHelpers.RunSync(() => roleManager.CreateAsync(defaultRole));
            }

            if (!userManager.Users.Any())
            {
                var user = new IdentityUser()
                {
                    UserName = "test",
                    Email = "test@liteolika.se"
                };

                userManager.Options.Password.SetDeveloperPasswordRequirements();
                IdentityResult result = AsyncHelpers.RunSync(() => userManager.CreateAsync(user, "test"));
                userManager.Options.Password.SetDefaultRequirements();

                if (result == IdentityResult.Success)
                {
                    AsyncHelpers.RunSync(() => userManager.AddToRoleAsync(user, defaultRole.Name));
                    AsyncHelpers.RunSync(() => userManager.AddClaimAsync(user, defaultClaim));

                }

                

            }



        }
    }

    public static class PasswordOptionsExtensions
    {
        public static void SetDeveloperPasswordRequirements(this PasswordOptions options)
        {
            options.RequireDigit = false;
            options.RequireLowercase = false;
            options.RequireNonAlphanumeric = false;
            options.RequireUppercase = false;
            options.RequiredLength = 4;
            options.RequiredUniqueChars = 0;
        }

        public static void SetDefaultRequirements(this PasswordOptions options)
        {
            options.RequireDigit = true;
            options.RequireLowercase = true;
            options.RequireNonAlphanumeric = true;
            options.RequireUppercase = true;
            options.RequiredLength = 6;
            options.RequiredUniqueChars = 1;
        }
    }


}
