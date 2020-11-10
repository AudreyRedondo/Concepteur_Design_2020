using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessCardDesigner.Models
{
    public class TemplateModel
    {
        [Key]
        public int TemplateId { get; set; }
        public string Title { get; set; }
        public string Picture { get; set; }
        public string Identity { get; set; }
        public string Facebook { get; set; }
        public string City { get; set; }
        public string NumberPhone { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
    }
}
