import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
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

// import java.util.List;
// import java.util.ArrayList;

// public class Main {
//     public static void main(String[] args) {
//         Tag tagInfos = new Tag(args[0], Arrays.asList(args[1]), Arrays.asList(args[2]), Arrays.asList(args[3]));

//         String fileName = tagInfos.getFileName();
//         List<String> attributesValuesTag = tagInfos.getAttributesValuesTag();
//         List<String> valuesAttributesTag = tagInfos.getValuesAttributesTag();
//         List<String> valuesTag = tagInfos.getValuesTag();

//         // [0] -> nome arquivo
//         // [1] -> valor das colunas dentro da tag (<description>)
//         // [2] -> valor dos atributos das colunas de  apresentação na tag
//         // [3] -> valor dos atributos das colunas do banco de dados na tag

//         List<DataEntry> entries = new ArrayList<>();

//         for(String arg : args) {
//             String[] values = arg.split(",");

//             if(values.length == 0) {
//                 System.out.println("Linha de dados inválida: " + arg);
//                 continue;
//             }

//             DataEntry entry = new DataEntry(values);
//             entries.add(entry);
//         }

//         System.out.println("Entradas processadas:");
//         for(DataEntry entry : entries) {
//             System.out.println(entry);
//         }
//     }
// }