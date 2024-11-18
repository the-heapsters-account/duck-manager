import java.io.File;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;
import org.w3c.dom.Element;

public class ReadXML {
    public static void main(String[] args) {
        try {
            // Cria uma instância de DocumentBuilderFactory
            DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
            // Cria um DocumentBuilder
            DocumentBuilder docBuilder = docFactory.newDocumentBuilder();
            // Faz o parsing do arquivo XML e obtém o documento
            Document doc = docBuilder.parse(new File("xml/file_destiny_temporary.xml"));

            // Normaliza o documento XML
            doc.getDocumentElement().normalize();

            // Obtém a lista de elementos pelo nome da tag
            NodeList nodeList = doc.getElementsByTagName("column");

            // Itera pelos nós
            for(int i = 0; i < nodeList.getLength(); i++) {
                Node node = nodeList.item(i);

                if(node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    // Aqui você pode acessar os elementos e atributos
                    System.out.println("elemento: " + element.getNodeName());
                    System.out.println("valor do atributo: " + element.getAttribute("attr-column"));
                    System.out.println("conteúdo: " + element.getTextContent());
                }
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}