package com.hayaawear.dto.product;

public class ProductAttributeResponse {

    private String attributeName;
    private String attributeValue;

    public ProductAttributeResponse() {
    }

    public ProductAttributeResponse(String attributeName, String attributeValue) {
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
    }

    public String getAttributeName() {
        return attributeName;
    }

    public void setAttributeName(String attributeName) {
        this.attributeName = attributeName;
    }

    public String getAttributeValue() {
        return attributeValue;
    }

    public void setAttributeValue(String attributeValue) {
        this.attributeValue = attributeValue;
    }
}
