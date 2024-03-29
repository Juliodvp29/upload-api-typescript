import app from "./app";
import {connect} from "./database";

async function main(){
    connect();
    await app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}`);
}

main();

