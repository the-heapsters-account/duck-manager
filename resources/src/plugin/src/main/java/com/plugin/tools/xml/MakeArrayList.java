package com.plugin.tools.xml;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

public class MakeArrayList {
    public List<String> makeList(String input) {
        List<String> list = new ArrayList<>(Arrays.asList(input.split(",")));

        return list;
    }
}