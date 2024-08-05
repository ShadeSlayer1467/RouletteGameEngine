using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Roulette
{
    public class Game
    {
        public Game()
        {
            random = new Random();
        }
        public int Role()
        {
            Number = random.Next(37);
            Console.WriteLine("Ball landed on: " + Number);
            NumberChanged();
            return Number;
        }
        public int Number { get; set; }
        public List<Person> People { get; set; }

        Random random { get; set; }
        

        public delegate void RoleNumber();
        public event RoleNumber NumberChanged;
    }
}
