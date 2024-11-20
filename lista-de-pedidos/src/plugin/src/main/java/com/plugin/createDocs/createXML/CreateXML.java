package com.plugin.createDocs.createXML;

import java.io.File;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.util.List;

import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.plugin.tools.xml.MakeArrayList;

public class CreateXML {
    public static void main(String[] args) {
        try {
            MakeArrayList makeArrayList = new MakeArrayList();

            String fileName = args[0];
            File xmlFile = new File("extras/xml/" + fileName + ".xml");

            List<String> tagValuesNameColumns = makeArrayList.makeList(args[1]);
            List<String> tagValuesColumns = makeArrayList.makeList(args[2]);
            List<String> tagValuesInfos = makeArrayList.makeList(args[3]);

            String rootElementName = "wish-list";

            DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder docBuilder = docBuilderFactory.newDocumentBuilder();
            Document doc;

            if(xmlFile.exists()) {
                doc = docBuilder.parse(xmlFile);
                doc.getDocumentElement().normalize();

                Element items = (Element) doc.getElementsByTagName("items").item(0);

                Element columns = doc.createElement("columns");
                items.appendChild(columns);

                for(int i = 0; i < attrNamesColumnsList.size(); i++) {
                    Element column = doc.createElement("column");
                    Attr attrName = doc.createAttribute(attrNamesColumnsList.get(i));
                    attrName.setValue(attrValuesColumnsList.get(i));
                    column.setAttributeNode(attrName);
                    column.appendChild(doc.createTextNode(tagValuesColumnsList.get(i)));
                    columns.appendChild(column);
                }

                System.out.println("XML atualizado com sucesso!");
            } else {
                doc = docBuilder.newDocument();

                Attr xmlns = doc.createAttribute("xmlns:xsi");
                xmlns.setValue("http://www.w3.org/2001/XMLSchema-instance");
                Attr xsi = doc.createAttribute("xsi:noNamespaceSchemaLocation");
                xsi.setValue("model.xsd");

                // adicionando o root
                Element root = doc.createElement(rootElementName);
                doc.appendChild(root);
                root.setAttributeNode(xmlns);
                root.setAttributeNode(xsi);

                Element items = doc.createElement("items");
                root.appendChild(items);

                Element columns = doc.createElement("columns");
                items.appendChild(columns);

                for(int i = 0; i < attrNamesColumnsList.size(); i++) {
                    Element column = doc.createElement("column");
                    Attr attrName = doc.createAttribute(attrNamesColumnsList.get(i));
                    attrName.setValue(attrValuesColumnsList.get(i));
                    column.setAttributeNode(attrName);
                    column.appendChild(doc.createTextNode(tagValuesColumnsList.get(i)));
                    columns.appendChild(column);
                }

                Element infos_list = doc.createElement("infos-list");
                root.appendChild(infos_list);

                // loop para adicionar infos
                for(int i = 0; i < attrNamesInfosList.size(); i++) {
                    Element info = doc.createElement("info");
                    Attr attrInfo = doc.createAttribute(attrNamesInfosList.get(i));
                    attrInfo.setValue(""); // Atribuindo um valor padrão vazio
                    info.setAttributeNode(attrInfo);
                    info.appendChild(doc.createTextNode(tagValuesInfosList.get(i)));
                    infos_list.appendChild(info);
                }
                System.out.println("XML criado com sucesso!");
            }

            TransformerFactory transformerFactory = TransformerFactory.newInstance();
            Transformer transformer = transformerFactory.newTransformer();
            DOMSource source = new DOMSource(doc);
            StreamResult result = new StreamResult(xmlFile);

            transformer.transform(source, result);
        } catch(Exception exception) {
            exception.printStackTrace();
        }
    }
}