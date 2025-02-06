using System;
namespace PrimerProyecto
{
    public static class Logger {
        public static void Log(string message){
            Console.WriteLine(message);
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Logger.Log("¿Como te llamas?");
            string nombre = Console.ReadLine() ?? "Invitado";
            Logger.Log($"Hola , {nombre}");
        }
    }
}