package mx.com.gm.domain;

import java.io.Serializable;
import javax.persistence.*;
//CLASE DE ENTIDAD
@Entity
@NamedQueries({
    @NamedQuery(name = "Persona.encontrarTodasPersonas", query = "SELECT p FROM Persona p ORDER BY p.idPersona")
})
public class Persona implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)//Forma en como generamos clase primaria
    @Column(name = "id_persona")//en bdd es id_personas ; en java idPersona
    private int idPersona;
    
    private String nombre;
    
    public Persona(){
        
    }
    
    public Persona(int idPersona){//Contructor recibe llave primaria
        this.idPersona = idPersona;
    }
    
    public Persona(int idPersona, String nombre){
        this.idPersona = idPersona;
        this.nombre = nombre;
    }

    public int getIdPersona() {
        return idPersona;
    }

    public void setIdPersona(int idPersona) {
        this.idPersona = idPersona;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public String toString() {
        return "Persona{" + "idPersona=" + idPersona + ", nombre=" + nombre + '}';
    }
    
}
