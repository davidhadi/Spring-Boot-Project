package com.JavaDemo.app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class StringController {

    @RequestMapping("getstring")
    @ResponseBody
    public String getString(){
        return "Hii, this is Shakil !";
    }

    @RequestMapping("gethtmlstring")
    @ResponseBody
    public String getHtmlString(){
        StringBuffer sb  = new StringBuffer();
        sb.append("<html>");
        sb.append("<body>");
        sb.append("this is my first tag program- changed hii");
        sb.append("</body>");
        sb.append("</html>");
        return sb.toString();
    }

    @RequestMapping("sayhello")
    public String getJSPString(){
        return "sayHello";
    }
}
