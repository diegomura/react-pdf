---
'@react-pdf/tailwind': minor
---

Support Tailwind's colour opacity suffix. `bg-red-500/50`, `text-black/25`, `border-[#bada55]/[0.6]` and the rest now resolve, wherever a colour is accepted — react-pdf reads both 8-digit hex and `rgba()`, so the alpha composites for real. A bare suffix is a percentage and a bracketed one is 0-1 unless marked with `%`. Fractional utilities such as `w-1/2` and `translate-x-1/2` are read first, so they keep their meaning.
