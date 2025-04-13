using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmployeeController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Employee>> Get()
        {
            return _context.Employees.ToList();
        }

        [HttpPost]
        public IActionResult Post(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
            return Ok(employee);
        }
    }
}
