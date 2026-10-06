package com.hayaawear.dto.product;

public class ProductVariantOptionResponse {

    private String optionName;
    private String optionValue;

    public ProductVariantOptionResponse() {
    }

    public ProductVariantOptionResponse(String optionName, String optionValue) {
        this.optionName = optionName;
        this.optionValue = optionValue;
    }

    public String getOptionName() {
        return optionName;
    }

    public void setOptionName(String optionName) {
        this.optionName = optionName;
    }

    public String getOptionValue() {
        return optionValue;
    }

    public void setOptionValue(String optionValue) {
        this.optionValue = optionValue;
    }
}
