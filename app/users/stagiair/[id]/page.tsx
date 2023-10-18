import StagairForm from "./StagairForm";

interface StagaireOverzichtProps {
  params:{id:string}
}

const StagaireOverzicht = ({params:{id}}:StagaireOverzichtProps) => {
  return (
    <StagairForm params={{id}} />
    );
}
 
export default StagaireOverzicht;