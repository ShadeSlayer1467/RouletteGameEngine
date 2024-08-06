using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Roulette
{

    public class Bet
    {
        public Bet(string bet, decimal amount, Game game)
        {
            Game = game;
            Name = bet;
            Amount = amount;
        }
        public int GetMultiplier()
        {
            decimal number = Game.Number;
            switch (Name.ToLower())
            {
                case "1-12":
                    if (number >= 1 || number <= 12)
                    {
                        return 3;
                    }
                    break;
                case "13-24":
                    if (number >= 13 || number <= 24)
                    {
                        return 3;
                    }
                    break;
                case "25-36":
                    if (number >= 25 || number <= 36)
                    {
                        return 3;
                    }
                    break;
                case "1st":
                    if (((number + 2) % 3) == 0)
                    {
                        return 3;
                    }
                    break;
                case "2nd":
                    if (((number + 1) % 3) == 0)
                    {
                        return 3;
                    }
                    break;
                case "3rd":
                    if ((number % 3) == 0)
                    {
                        return 3;
                    }
                    break;
                case "1-18":
                    if (number >= 1 || number <= 18)
                    {
                        return 2;
                    }
                    break;
                case "19-36":
                    if (number >= 19 || number <= 36)
                    {
                        return 2;
                    }
                    break;
                case "odd":
                    if ((number % 2) == 1)
                    {
                        return 2;
                    }
                    break;
                case "even":
                    if ((number % 2) == 0)
                    {
                        return 2;
                    }
                    break;
                case "red":
                    if (number == 1 || number == 3 || number == 5 || number == 7 || number == 9 || number == 12 || number == 14 || number == 16 || number == 18 || number == 19 || number == 21 || number == 23 || number == 25 || number == 27 || number == 30 || number == 32 || number == 34 || number == 36)
                    {
                        return 2;
                    }
                    break;
                case "black":
                    if (number == 2 || number == 4 || number == 6 || number == 8 || number == 10 || number == 11 || number == 13 || number == 15 || number == 17 || number == 20 || number == 22 || number == 24 || number == 26 || number == 28 || number == 29 || number == 31 || number == 33 || number == 35)
                    {
                        return 2;
                    }
                    break;
                default:
                    try
                    {
                        if (int.Parse(Name) == number)
                        {
                            return 36;
                        }
                    }
                    catch (Exception)
                    {

                    }
                    break;
            }
            return 0;

        }
        public bool Win(int number)
        {
            bool win = false;

            switch (Name.ToLower())
            {
                case "1-12":
                    if (number >= 1 && number <= 12)
                    {
                        win = true;
                        Amount *= 3;
                    }
                    break;
                case "13-24":
                    if (number >= 13 && number <= 24)
                    {
                        win = true;
                        Amount *= 3;
                    }
                    break;
                case "25-36":
                    if (number >= 25 && number <= 36)
                    {
                        win = true;
                        Amount *= 3;
                    }
                    break;
                case "1st":
                    if (((number + 2) % 3) == 0)
                    {
                        win = true;
                        Amount *= 3;
                    }
                    break;
                case "2nd":
                    if (((number + 1) % 3) == 0)
                    {
                        win = true;
                        Amount *= 3;
                    }
                    break;
                case "3rd":
                    if ((number % 3) == 0)
                    {
                        win = true;
                        Amount *= 3;
                    }
                    break;
                case "1-18":
                    if (number >= 1 && number <= 18)
                    {
                        win = true;
                        Amount *= 2;
                    }
                    break;
                case "19-36":
                    if (number >= 19 && number <= 36)
                    {
                        win = true;
                        Amount *= 2;
                    }
                    break;
                case "odd":
                    if ((number % 2) == 1)
                    {
                        win = true;
                        Amount *= 2;
                    }
                    break;
                case "even":
                    if ((number % 2) == 0)
                    {
                        win = true;
                        Amount *= 2;
                    }
                    break;
                case "red":
                    if (number == 1 || number == 3 || number == 5 || number == 7 || number == 9 || number == 12 || number == 14 || number == 16 || number == 18 || number == 19 || number == 21 || number == 23 || number == 25 || number == 27 || number == 30 || number == 32 || number == 34 || number == 36)
                    {
                        win = true;
                        Amount *= 2;
                    }
                    break;
                case "black":
                    if (number == 2 || number == 4 || number == 6 || number == 8 || number == 10 || number == 11 || number == 13 || number == 15 || number == 17 || number == 20 || number == 22 || number == 24 || number == 26 || number == 28 || number == 29 || number == 31 || number == 33 || number == 35)
                    {
                        win = true;
                        Amount *= 2;
                    }
                    break;
                default:
                    try
                    {
                        if (int.Parse(Name) == number)
                        {
                            win = true;
                            Amount *= 36;
                        }
                    }
                    catch (Exception)
                    {

                    }
                    break;
            }

            return win;
        }
        public string Name { get; set; }
        public decimal Amount { get; set; }

        public Game Game { get; set; }
    }
}
