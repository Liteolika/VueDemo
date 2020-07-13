using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace VueDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController
    {
        private static readonly string[] Summaries = new[]
        {
            "Kallt som fan", "Bracing", "Ruggigt", "Svalt", "Milt", "Varmt", "Balmy", "Hot", "Sweltering", "Svinhett"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
                {
                    Date = DateTime.UtcNow.AddDays(index),
                    TemperatureC = rng.Next(-20, 55),
                    Summary = Summaries[rng.Next(Summaries.Length)]
                })
                .ToArray();
        }
    }
}
