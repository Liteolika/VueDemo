using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace VueApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [SuppressMessage("ReSharper", "AsyncConverter.ConfigureAwaitHighlighting")]
    [AllowAnonymous]
    public class EditorController : ControllerBase
    {
        [HttpPost]
        public async Task<EditorData> Save(EditorData data)
        {
            await Task.Delay(1);

            data.Saved = true;
            return data;

        }

    }

    public class EditorData
    {
        public bool Saved { get; set; }
        public string Content { get; set; }
    }

}
