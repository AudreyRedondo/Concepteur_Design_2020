using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessCardDesigner.Models
{
    public class Plan2DViewModel : TemplateModel
    {
        
        public string SVG { get; set; }

        public Plan2DViewModel()
        {
            SVG = string.Format(@"");
        }
    }
}
