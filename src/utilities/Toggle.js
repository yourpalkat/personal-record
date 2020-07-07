import { useState } from 'react'

const Toggle = ({ children }) => {
  const [on, setOn] = useState(false);

  const toggle = () => {
    setOn(!on);
  }

  return children({ on, toggle });
}

export default Toggle;