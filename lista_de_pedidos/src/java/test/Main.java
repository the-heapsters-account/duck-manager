import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        String fileName = args[0];
        Tag tagItems = new Tag(
            Arrays.asList(args[1]),
            Arrays.asList(args[2]),
            null,
            Arrays.asList(args[3])
        );
        List<String> attributesValuesTagItemsList = tagItems.getAttributesNames();
        List<String> valuesAttributesTagItemsList = tagItems.getAttributesValues();
        List<String> tagValuesItemsList = tagItems.getTagValues();

        Tag tagSpreadsheet = new Tag(
            null,
            null,
            Arrays.asList(args[4]),
            Arrays.asList(args[5])
        );
        List<String> tagNamesSpreadsheettagValuesSpreadsheeList = tagSpreadsheet.getTagNames();
        List<String> tagValuesSpreadsheeList = tagSpreadsheet.getTagValues();

        tagItems.printDates();
        System.out.println();
        tagSpreadsheet.printDates();

        // List<DataEntry> entries = new ArrayList<>();

        // for(String arg : args) {
        //     String[] values = arg.split(",");

        //     if(values.length == 0) {
        //         System.out.println("Linha de dados inválida: " + arg);
        //         continue;
        //     }

        //     DataEntry entry = new DataEntry(values);
        //     entries.add(entry);
        // }

        // System.out.println("Entradas processadas:");
        // for(DataEntry entry : entries) {
        //     System.out.println(entry);
        // }
    }
}