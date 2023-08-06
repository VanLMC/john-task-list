import { useState } from 'react'
import { StyledCheckBox } from './styles';

export default function Checkbox() {
    const [checked, setChecked] = useState(false);

  return (
    <StyledCheckBox checked={checked} onChange={(e) => {setChecked(e.target.checked)}} type="checkbox" id="cheked" name="cheked" value="cheked"/>
  )
}
