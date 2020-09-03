using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace VueApp.Hubs
{
    public interface IChatHub
    {
        Task SendMessage(string user, string message);
    }

    public class ChatHub : Hub, IChatHub
    {
        private readonly IHubContext<ChatHub> hubContext;

        private readonly Timer _keepAliveTimer;

        private void KeepAliveCallback(object state)
        {
            hubContext.Clients.All
                .SendAsync("RecieveMessage", "system", "All well?");
        }


        public ChatHub(IHubContext<ChatHub> hubContext)
        {
            this.hubContext = hubContext;

            _keepAliveTimer = new Timer(
                KeepAliveCallback, null,
                TimeSpan.FromSeconds(2),
                TimeSpan.FromSeconds(10));

        }

        public Task SendMessage(string user, string message)
        {
            return hubContext.Clients.All
                .SendAsync("RecieveMessage", user, message);
        }
    }
}
