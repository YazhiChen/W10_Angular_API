using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using W10.Interface;
using W10.Models;

namespace W10.Repositories
{
    public class UnitRepository : IUnitRepository
    {

        W10DBEntities W10DB = new W10DBEntities();
        IEnumerable<Models.Unit> IUnitRepository.GetAll()
        {
            return W10DB.Units;
        }
        Models.Unit IUnitRepository.Get(int id)
        {
            return W10DB.Units.Find(id);
        }
        Models.Unit IUnitRepository.Add(Models.Unit item)
        {
            if (item == null) { throw new ArgumentNullException("item"); }
            // TO DO : Code to save record into database
            W10DB.Units.Add(item);
            W10DB.SaveChanges();
            return item;
        }
        bool IUnitRepository.Update(Models.Unit item)
        {
            if (item == null) { throw new ArgumentNullException("item"); }
            // TO DO : Code to update record into database
            var units = W10DB.Units.Single(a => a.Id == item.Id);
            units.UnitName = item.UnitName;
            units.UnitCode = item.UnitCode;
            W10DB.SaveChanges();
            return true;
        }
        bool IUnitRepository.Delete(int id)
        {
            //throw new NotImplementedException();
           Unit units = W10DB.Units.Find(id);
            W10DB.Units.Remove(units);
            W10DB.SaveChanges();
            return true;
        }
    }
}

