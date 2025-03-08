import { Text } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/three";

function HolographicMsg() {
   const welcomeMsg = "Hello, I'm ";
   const name = "Hamna.";
   const restMsg = "\n I'm a Full-Stack Web Developer.";

  const { opacity } = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 150, friction: 20 },
  });

  return (
    <animated.group style={{ opacity }}>
      <Text
        position={[-0.8, 1.3, -2]}
        fontSize={0.5}
        color="#FFFFFF"
        font="/fonts/Exo2-Regular.ttf"
        maxWidth={12}
        textAlign="center"
        lineHeight={1.2}
      >
        {welcomeMsg}
      </Text>

      <Text
        position={[-2 + welcomeMsg.length * 0.3, 1.3, -2]} 
        fontSize={0.5}
        color="#B069DB"
        font="/fonts/Exo2-Regular.ttf"
        maxWidth={12}
        textAlign="center"
        lineHeight={1.2}
      >
        {name}
      </Text>

      <Text
        position={[-5.2 + (welcomeMsg.length + name.length) * 0.3, 1, -2]} 
        fontSize={0.5}
        color="#FFFFFF"
        font="/fonts/Exo2-Regular.ttf"
        maxWidth={12}
        textAlign="center"
        lineHeight={1.2}
      >
        {restMsg}
      </Text>
    </animated.group>
  );
}

export default HolographicMsg;
