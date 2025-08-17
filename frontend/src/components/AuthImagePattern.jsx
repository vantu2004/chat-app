import { FaRegCommentDots, FaSmileBeam, FaPaperPlane } from "react-icons/fa";

const AuthImagePattern = () => {
  return (
    <div className="flex-1 flex items-center justify-center relative p-8 overflow-hidden bg-base-200 order-2 lg:order-1">
      {/* Blurred gradient blobs */}
      <div className="absolute w-96 h-96 bg-primary/30 rounded-full blur-3xl top-10 left-20 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-secondary/30 rounded-full blur-3xl bottom-20 right-20 animate-float-slow"></div>
      <div className="absolute w-72 h-72 bg-accent/20 rounded-full blur-3xl top-1/3 right-1/4 animate-float"></div>

      {/* Big Background Text */}
      <h2
        className="absolute text-5xl md:text-9xl font-extrabold 
               text-transparent bg-clip-text 
               bg-gradient-to-r from-primary via-secondary to-accent 
               bg-[length:200%_200%] animate-text
               opacity-20 select-none text-center leading-tight 
               drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]"
      >
        CHAT <br />
        CONNECT <br />
        ENJOY
      </h2>

      {/* Icon Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 z-10">
        <FaRegCommentDots className="text-7xl text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.7)] animate-bounce" />
        <FaSmileBeam className="text-7xl text-secondary drop-shadow-[0_0_15px_rgba(236,72,153,0.6)] animate-pulse" />
        <FaPaperPlane className="text-7xl text-accent drop-shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-float" />
        <FaSmileBeam className="text-7xl text-secondary drop-shadow-[0_0_15px_rgba(236,72,153,0.6)] animate-wiggle" />
        <FaPaperPlane className="text-7xl text-accent drop-shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-spin-slow" />
        <FaRegCommentDots className="text-7xl text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.7)] animate-pulse" />
      </div>
    </div>
  );
};

export default AuthImagePattern;
