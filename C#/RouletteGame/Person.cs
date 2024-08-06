using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Roulette
{
    public class Person
    {

        public decimal bank { get; set; }
        public List<Bet> bets { get; set; }
        public Game Game { get; set; }
        public string Name { get; set; }
        public decimal totalwon { get; set; }

        public Person(string name, Game Game, decimal bank)
        {
            this.bank = bank;
            totalwon = 0;
            bets = new List<Bet>();
            Name = name;
            this.Game = Game;
            this.Game.NumberChanged += HandleBets;
        }
        public void Makebet(string name, int amount)
        {
            Bet bet = new Bet(name, amount, Game);
            bets.Add(bet);
        }
        public void HandleBets()
        {
            int number = Game.Number;

            foreach (Bet bet in bets)
            {
                int winMulti = bet.GetMultiplier();
                decimal winnings = 0;
                string won;
                if (bet.Win(number))
                {
                    winnings = bet.Amount - (bet.Amount / winMulti);
                    totalwon += winnings;
                    bet.Amount -= winnings;
                    bank += winnings;
                    won = "Won";
                }
                else
                {
                    winnings = -bet.Amount;
                    totalwon -= bet.Amount;
                    bet.Amount = 0;
                    won = "Lost";
                }
                PrintRound(bet, won, winnings, totalwon);
            }
            bets.Clear();
        }
        private void PrintRound(Bet bet, string won, decimal winnings, decimal totalwon)
        {
            Console.WriteLine("{0} {1, -5} bet: {2,-6} Winnings: {3,-7} Total won: {4,-7}", Name, won, bet.Name, winnings, totalwon);
        }
    }
}
