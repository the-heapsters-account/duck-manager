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
            List<String> tagNamesInfos = makeArrayList.makeList(args[3]);
            List<String> tagValuesInfos = makeArrayList.makeList(args[4]);

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

                for(String columnValue : tagValuesColumns) {
                    Element column = doc.createElement("column");
                    String columnValueFormatted = columnValue.toString().replaceAll("_", " ").replaceAll("__", " ").replaceAll("  ", " ");
                    column.appendChild(doc.createTextNode(columnValueFormatted));
                    columns.appendChild(column);
                }

                System.out.println("XML atualizado com sucesso!");
            } else {
                doc = docBuilder.newDocument();

                Element root = doc.createElement(rootElementName);
                doc.appendChild(root);

                Attr xmlns = doc.createAttribute("xmlns:xsi");
                xmlns.setValue("http://www.w3.org/2001/XMLSchema-instance");
                root.setAttributeNode(xmlns);

                Element items = doc.createElement("items");
                root.appendChild(items);

                Element columns = doc.createElement("columns");
                items.appendChild(columns);
                for(String columnValue : tagValuesColumns) {
                    Element column = doc.createElement("column");
                    String columnValueFormatted = columnValue.toString().replaceAll("_", " ").replaceAll("__", " ").replaceAll("  ", " ");
                    column.appendChild(doc.createTextNode(columnValueFormatted));
                    columns.appendChild(column);
                }

                Element tagValues = doc.createElement("tag-values");
                root.appendChild(tagValues);

                Element columnsNames = doc.createElement("columns-names");
                tagValues.appendChild(columnsNames);
                for(String nameColumn : tagValuesNameColumns) {
                    Element columnName = doc.createElement("column-name");
                    String nameColumnFormatted = nameColumn.toString().replaceAll("_", " ").replaceAll("__", " ").replaceAll("  ", " ");
                    columnName.appendChild(doc.createTextNode(nameColumnFormatted));
                    columnsNames.appendChild(columnName);
                }

                Element names = doc.createElement("names");
                tagValues.appendChild(names);
                for(String info : tagNamesInfos) {
                    Element name = doc.createElement("name");
                    String infoFormatted = info.toString().replaceAll("_", " ");
                    name.appendChild(doc.createTextNode(infoFormatted));
                    names.appendChild(name);
                }

                Element values = doc.createElement("values");
                tagValues.appendChild(values);
                for(String info : tagValuesInfos) {
                    Element value = doc.createElement("value");
                    String infoFormatted = info.toString().replaceAll("_", " ");
                    value.appendChild(doc.createTextNode(infoFormatted));
                    values.appendChild(value);
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