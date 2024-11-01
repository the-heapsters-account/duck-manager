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

public class Main {
    public static void main(String[] args) {
        try {
            //criando o documento
            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory.newDocumentBuilder();

            //novo documento em branco
            Document documentoXML = documentBuilder.newDocument();

            //cria a raiz(ListaProdutos) e adiciona no documento
            Element ListaProdutos = documentoXML.createElement("ListaProdutos");
            documentoXML.appendChild(ListaProdutos);

            //cria o elemento <produto> e o atributo "id"
            Element produto = documentoXML.createElement("produto");
            Attr id = documentoXML.createAttribute("id");
            id.setValue("1");

            //adiciona o "id" em produto
            produto.setAttributeNode(id);

            //adiciona produto ao ListaProdutos
            ListaProdutos.appendChild(produto);

            //adiciona o texto "Murylo" ao <nome>
            Element nome = documentoXML.createElement("nome");
            nome.appendChild(documentoXML.createTextNode("Cadeira de rodas"));
            produto.appendChild(nome);

            //adiciona "18" em <quantidade> 
            Element quantidade = documentoXML.createElement("quantidade");
            quantidade.appendChild(documentoXML.createTextNode("18"));
            produto.appendChild(quantidade);

            //transformando o documento em XML
            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();//transformador doc. -> XML

            DOMSource documentoFonte = new DOMSource(documentoXML);
            //salva o resultado final em um arquivo
            StreamResult documentoFinal = new StreamResult(new File("../xml/ListaProdutos.xml"));

            //exibindo o xml no terminal
            StreamResult consoleResult = new StreamResult(System.out);
            transformer.transform(documentoFonte, consoleResult);
            
            //transforma o documento num arquivo xml
            transformer.transform(documentoFonte, documentoFinal);

            System.out.println("XML criado com sucesso!");

        } catch (ParserConfigurationException | TransformerException ex) {
            ex.printStackTrace();
        }
    }
}