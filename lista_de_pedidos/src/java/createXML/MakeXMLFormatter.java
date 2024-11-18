public class MakeXMLFormatter {
    public static void main(String[] args) {
        XMLFormatter xmlFormatter = new XMLFormatter();

        try {
            xmlFormatter.formatXMLFromFile("xml/" + args[0] + ".xml");
            System.out.println("Arquivo XML formatado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}