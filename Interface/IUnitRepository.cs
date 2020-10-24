using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using W10.Models;

namespace W10.Interface
{
    interface IUnitRepository
    {
        IEnumerable<Unit> GetAll();
        Unit Get(int id);
        Unit Add(Unit item);
        bool Update(Unit item);
        bool Delete(int id);
    }
}
