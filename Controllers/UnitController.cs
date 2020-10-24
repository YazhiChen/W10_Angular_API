using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using W10.Interface;
using W10.Models;
using W10.Repositories;

namespace W10.Controllers
{
    public class UnitController : ApiController
    {
        static readonly IUnitRepository repository = new UnitRepository();
        public IEnumerable<Unit> GetAllUnits()
        {
            return repository.GetAll();
        }
        public Unit PostUnit(Unit item)
        {
            return repository.Add(item);
        }
        public IEnumerable<Unit> PutUnit(int id, Unit unit)
        {
            unit.Id = id;
            if (repository.Update(unit))
            {
                return repository.GetAll();
            }
            else
            {
                return null;
            }
        }
        public bool DeleteUnit(int id)
        {
            if (repository.Delete(id))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
