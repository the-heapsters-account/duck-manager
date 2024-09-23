import java.io.File;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

public class ReadXML {
    private File file;

    ReadXML(String path) {
        try {
            this.file = new File(path);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
    }

    public String getTextContentByTagName(String tagName) {
        try {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document document = db.parse(this.file);
            document.getDocumentElement().normalize();

            NodeList tagNameList = document.getElementsByTagName(tagName);

            if(tagNameList.getLength() > 0) {
                String elementTextContent = tagNameList.item(0).getTextContent();

                return elementTextContent;
            } else {
                return "não foi possível encontrar o conteúdo interno da tag \"" + tagName + "\"";
            }
        } catch(Exception exception) {
            exception.printStackTrace();
        }

        return "";
    }
}