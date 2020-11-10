using BusinessCardDesigner.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace BusinessCardDesigner.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private List<TemplateModel> Templates { get; set; }

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
            InitTemplateList();
        }

        private void InitTemplateList()
        {
            /* TODO : Put templates into database */

            Templates = new List<TemplateModel>();

            var iphone11 = new Iphone11ViewModel();
            iphone11.TemplateId = 1;
            iphone11.Title = "Iphone 11";
            iphone11.Picture = "/img/thumbnails/Iphone11.png";

            var plan2D = new Plan2DViewModel();
            plan2D.TemplateId = 2;
            plan2D.Title = "Plan 2D";
            plan2D.Picture = "/img/thumbnails/Plan2D.png";

            Templates.Add(iphone11);
            Templates.Add(plan2D);
        }

        public IActionResult Index()
        {
            var template = Templates.Where(t => t.TemplateId == 1).FirstOrDefault();
            return View(template);
        }

        [HttpPost]
        public IActionResult SelectTemplate(int id)
        {
            var template = Templates.Where(t => t.TemplateId == id).FirstOrDefault();
            if (template == null)
            {
                return RedirectToAction("Index");
            }
            return Ok();
        }

        [HttpGet]
        public IActionResult GetTemplate(int id)
        {
            var template = Templates.Where(t => t.TemplateId == id).FirstOrDefault();
            return PartialView("~/Views/Templates/_" + template.Title.Replace(" ", "") + ".cshtml");
        }

        [HttpGet]
        public IActionResult GetForm(int id)
        {
            var template = Templates.Where(t => t.TemplateId == id).FirstOrDefault();
            return PartialView("~/Views/Pages/_" + template.Title.Replace(" ", "") + ".cshtml", template);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult _Models()
        {
            return PartialView(Templates);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
