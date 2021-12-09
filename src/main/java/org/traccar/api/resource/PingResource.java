package org.traccar.api.resource;

import org.traccar.api.BaseResource;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("ping")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)

public class PingResource extends BaseResource{

    @PermitAll
    @GET
    public String get(){
        return "ping OK";
    }
}
