import { StoryForm } from "@/components/story-form"
import { Moon, Github } from "lucide-react"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 -z-10">
        {/* Green orb - top left */}
        <div 
          className="gradient-orb animate-float-1 w-[600px] h-[600px] -top-32 -left-32"
          style={{ background: 'var(--gradient-green)' }}
        />
        {/* Blue orb - top right */}
        <div 
          className="gradient-orb animate-float-2 w-[500px] h-[500px] top-20 -right-20"
          style={{ background: 'var(--gradient-blue)' }}
        />
        {/* Purple orb - bottom center */}
        <div 
          className="gradient-orb animate-float-3 w-[700px] h-[700px] -bottom-40 left-1/3"
          style={{ background: 'var(--gradient-purple)' }}
        />
        {/* Secondary green orb - bottom right */}
        <div 
          className="gradient-orb animate-float-1 w-[400px] h-[400px] bottom-20 right-10 opacity-30"
          style={{ background: 'var(--gradient-green)', animationDelay: '-10s' }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <header className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="glass p-3 rounded-2xl">
              <Moon className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
            BedTimeStoryMaster
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto text-balance leading-relaxed">
            Creez des histoires du soir uniques pour vos enfants en moins d&apos;une minute
          </p>
        </header>

        {/* Form */}
        <StoryForm />

        {/* Footer */}
        <footer className="mt-20 pt-8 text-center">
          <div className="glass inline-flex flex-col items-center gap-4 px-8 py-6 rounded-2xl">
            <a
              href="https://github.com/Nyco/BedTimeStoryMaster"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              Code source (AGPLv3)
            </a>
            <p className="text-xs text-muted-foreground">
              Fait avec soin pour les parents qui racontent des histoires
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
