import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        if(args.length == 0) {
            System.out.println("Nenhum argumento foi passado.");
            return;
        }

        List<DataEntry> entries = new ArrayList<>();

        for(String arg : args) {
            String[] values = arg.split(",");

            if(values.length == 0) {
                System.out.println("Linha de dados inválida: " + arg);
                continue;
            }

            DataEntry entry = new DataEntry(values);
            entries.add(entry);
        }

        System.out.println("Entradas processadas:");
        for(DataEntry entry : entries) {
            System.out.println(entry);
        }
    }
}