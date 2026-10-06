package com.hayaawear.dto.product;

public class ProductVariantOptionRequest {

    private String optionName;
    private String optionValue;

    public ProductVariantOptionRequest() {
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
