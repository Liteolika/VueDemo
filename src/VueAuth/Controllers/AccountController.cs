using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace VueAuth.Controllers
{
    public class LoginCredentials
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public abstract class AuthResponse<T> where T : AuthResponse<T>, new()
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }

        public JsonResult AsJsonResponse()
        {
            var json = JsonConvert.SerializeObject(this);
            return new JsonResult(json);
        }

        public static T CreateFromPrincipal(ClaimsPrincipal principal)
        {
            var response = new T
            {
                Name = principal.Identity.Name,
                Email = principal.FindFirstValue(ClaimTypes.Email),
                Roles = principal.FindAll(ClaimTypes.Role).Select(x => x.Value).ToList()
            };

            return response;
        }
    }

    public class TokenResponse : AuthResponse<TokenResponse>
    {
        public string Token { get; set; }
    }

    public class LoginResponse : AuthResponse<LoginResponse>
    {

    }

    

    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        private async Task InitAuth(LoginCredentials creds)
        {
            if (!_userManager.Users.Any())
            {
                // Create a default user.
                var result = await _userManager.CreateAsync(new IdentityUser
                {
                    Email = creds.Email,
                    UserName = creds.Email,
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true
                }, creds.Password);

                if (result.Succeeded)
                {
                    await _roleManager.CreateAsync(new IdentityRole("user"));
                    await _roleManager.CreateAsync(new IdentityRole("forecaster"));
                    await _userManager.AddToRoleAsync(await _userManager.FindByEmailAsync(creds.Email), "user");
                    await _userManager.AddToRoleAsync(await _userManager.FindByEmailAsync(creds.Email), "forecaster");
                }
            }
        }

        // Same key configured in startup to validate the JWT tokens
        private static readonly SigningCredentials SigningCreds = new SigningCredentials(Startup.SecurityKey, SecurityAlgorithms.HmacSha256);
        private readonly JwtSecurityTokenHandler _tokenHandler = new JwtSecurityTokenHandler();

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCredentials creds)
        {
            await InitAuth(creds);

            if (!await ValidateLogin(creds))
            {
                return Json(new
                {
                    error = "Login failed"
                });
            }

            var principal = await GetPrincipal(creds, Startup.CookieAuthScheme);

            await HttpContext.SignInAsync(Startup.CookieAuthScheme, principal);

            var response = LoginResponse.CreateFromPrincipal(principal);
            return response.AsJsonResponse();
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            await _signInManager.SignOutAsync();
            return StatusCode(200);
        }

        [HttpGet("context")]
        public JsonResult Context()
        {
            return Json(new
            {
                name = this.User?.Identity?.Name,
                email = this.User?.FindFirstValue(ClaimTypes.Email),
                roles = this.User?.FindAll(ClaimTypes.Role),
            });
        }

        [HttpPost("token")]
        public async Task<IActionResult> Token([FromBody] LoginCredentials creds)
        {
            await InitAuth(creds);

            if (!await ValidateLogin(creds))
            {
                return Json(new
                {
                    error = "Login failed"
                });
            }

            var principal = await GetPrincipal(creds, Startup.JWTAuthScheme);

            var token = new JwtSecurityToken(
                "soSignalR",
                "soSignalR",
                principal.Claims,
                expires: DateTime.UtcNow.AddDays(30),
                signingCredentials: SigningCreds);

            var response = TokenResponse.CreateFromPrincipal(principal);
            response.Token = _tokenHandler.WriteToken(token);
            return response.AsJsonResponse();
        }

        private async Task<bool> ValidateLogin(LoginCredentials creds)
        {
            var user = await _userManager.FindByEmailAsync(creds.Email);
            
            if (user == null) return false;
            
            var verificationResult = await _signInManager.CheckPasswordSignInAsync(user, creds.Password, false);
            
            return verificationResult.Succeeded;
        }

        private async Task<ClaimsPrincipal> GetPrincipal(LoginCredentials creds, string authScheme)
        {
            var user = await _signInManager.UserManager.FindByEmailAsync(creds.Email);
            
            await _signInManager.SignInAsync(user, false);
            
            var principal = await _signInManager.CreateUserPrincipalAsync(user);

            return principal;
        }
    }
}
