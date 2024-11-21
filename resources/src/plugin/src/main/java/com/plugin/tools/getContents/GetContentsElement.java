package com.plugin.tools.getContents;

import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.NodeList;
import org.w3c.dom.Node;
import org.w3c.dom.Element;

public class GetContentsElement {
    public List<String> getContents(NodeList nodeList) {
        List<String> content = new ArrayList<>();

        for(int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);

            if(node.getNodeType() == Node.ELEMENT_NODE) {
                Element element = (Element) node;
                content.add(element.getTextContent().trim());
            }
        }

        return content;
    }
}