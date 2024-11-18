import java.io.*;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.stream.StreamResult;

public class XMLFormatter {
    public static void formatXMLFromFile(String filePath) throws Exception {
        String unformattedXml = readFile(filePath);

        String formattedXml = formatXMLString(unformattedXml);

        writeFile(filePath, formattedXml);
    }

    private static String readFile(String filePath) throws IOException {
        StringBuilder content = new StringBuilder();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                content.append(line).append("\n");
            }
        }
        return content.toString();
    }

    private static void writeFile(String filePath, String formattedXml) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
            writer.write(formattedXml);
        }
    }

    public static String formatXMLString(String unformattedXml) throws Exception {
        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(new InputSource(new StringReader(unformattedXml)));

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();

            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4");

            StringWriter writer = new StringWriter();
            transformer.transform(new javax.xml.transform.dom.DOMSource(document), new StreamResult(writer));

            return writer.toString();
        } catch (Exception e) {
            throw new Exception("Erro ao formatar XML", e);
        }
    }

    public static void main(String[] args) {
        try {
            formatXMLFromFile("xml/file-destiny.xml");
            System.out.println("Arquivo XML formatado com sucesso!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}