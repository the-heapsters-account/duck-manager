package createXML;

import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

public class TesteDeCriacaoXML {

    public static void main(String[] args) {
        try {
            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();

            Document documentoXML = documentBuilder.newDocument();

            Element root = documentoXML.createElement("root");
            documentoXML.appendChild(root);

            Element pessoa = documentoXML.createElement("pessoa");
            Attr id = documentoXML.createAttribute("id");
            id.setValue("1");

            pessoa.setAttributeNode(id);

            root.appendChild(pessoa);

            Element nome = documentoXML.createElement("nome");
            nome.appendChild(documentoXML.createTextNode("Murylo"));
            pessoa.appendChild(nome);

            Element idade = documentoXML.createElement("idade");
            idade.appendChild(documentoXML.createTextNode("18"));
            pessoa.appendChild(idade);

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();

            DOMSource documentoFonte = new DOMSource(documentoXML);
            StreamResult documentoFinal = new StreamResult(new File("D:\\pessoa.xml"));

            transformer.transform(documentoFonte, documentoFinal);

            System.out.println("XML criado com sucesso!");

        } catch (ParserConfigurationException | TransformerException ex) {
            ex.printStackTrace();
        }
    }
}