export const getFactionTheme = (username: string | null) => {
  switch (username) {
    case "crimson_dawn":
      return {
        name: "Crimson Dawn",
        color: "red",
        text: "text-red-500",
        border: "border-red-900/50",
        bg: "bg-red-950/20",
        glow: "shadow-red-900/50",
        btn: "bg-red-600 hover:bg-red-700 text-black",
        iconColor: "text-red-500"
      };
    
    case "black_sun":
      return {
        name: "Black Sun",
        color: "emerald", // Green aesthetic
        text: "text-emerald-400",
        border: "border-emerald-900/50",
        bg: "bg-emerald-950/20",
        glow: "shadow-emerald-900/50",
        btn: "bg-emerald-600 hover:bg-emerald-500 text-black",
        iconColor: "text-purple-500" // Purple accent for Xizor
      };
      
    default: // The Empire (or admin fallback)
      return {
        name: "Galactic Empire",
        color: "cyan",
        text: "text-cyan-400",
        border: "border-cyan-900/50",
        bg: "bg-slate-900/50",
        glow: "shadow-cyan-900/50",
        btn: "bg-cyan-600 hover:bg-cyan-500 text-white",
        iconColor: "text-cyan-400"
      };
  }
};