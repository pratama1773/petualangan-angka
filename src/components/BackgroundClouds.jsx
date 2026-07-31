const clouds = [
  { top: '6%', left: '8%', size: 90, delay: '0s', dur: '7s' },
  { top: '14%', left: '72%', size: 130, delay: '1.2s', dur: '9s' },
  { top: '40%', left: '-4%', size: 110, delay: '0.6s', dur: '8s' },
  { top: '65%', left: '80%', size: 90, delay: '2s', dur: '6.5s' },
  { top: '85%', left: '15%', size: 70, delay: '0.4s', dur: '7.5s' },
]

export default function BackgroundClouds() {
  return (
    <div className="bg-clouds" aria-hidden="true">
      {clouds.map((c, i) => (
        <div
          key={i}
          className="cloud anim-float"
          style={{
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.size * 0.6,
            animationDelay: c.delay,
            animationDuration: c.dur,
          }}
        />
      ))}
    </div>
  )
}
