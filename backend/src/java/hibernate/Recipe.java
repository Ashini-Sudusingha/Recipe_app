package hibernate;

import static com.mchange.v2.c3p0.impl.C3P0Defaults.user;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "recipe")
public class Recipe implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name", length = 45, nullable = false)
    private String name;
    @Column(name = "cal", nullable = false)
    private int cal;
    @Column(name = "per_person", nullable = false)
    private int personCount;
    @Column(name = "ingredients", length = 500, nullable = false)
    private String ingredients;
    @Column(name = "method", length = 1000, nullable = false)
    private String method;
    @Column(name = "image_parth", length = 200, nullable = false)
    private String image_parth;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    public Recipe(){}

     public  Recipe (String name, int cal,int per_person,String ingredients,String method, String image_parth, User user ){
      this.name = name;
      this.cal = cal;
      this.personCount = per_person;
      this.ingredients =ingredients;
      this.method = method;
      this.image_parth = image_parth;
      this.user = user;
    }
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    public int getCal() {
        return cal;
    }

    public void setCal(int cal) {
        this.cal = cal;
    }

    /**
     * @return the personCount
     */
    public int getPersonCount() {
        return personCount;
    }

    /**
     * @param personCount the personCount to set
     */
    public void setPersonCount(int personCount) {
        this.personCount = personCount;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public User getUer() {
        return user;
    }

    public void setUer(User uer) {
        this.user = uer;
    }

    /**
     * @return the image_parth
     */
    public String getImage_parth() {
        return image_parth;
    }

    /**
     * @param image_parth the image_parth to set
     */
    public void setImage_parth(String image_parth) {
        this.image_parth = image_parth;
    }

}
