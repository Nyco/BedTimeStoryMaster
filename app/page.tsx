import { StoryForm } from "@/components/story-form"
import { Moon, Github } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Moon className="h-10 w-10 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
              BedTimeStoryMaster
            </h1>
          </div>
          <p className="text-muted-foreground max-w-md mx-auto text-balance leading-relaxed">
            Créez des histoires du soir uniques pour vos enfants en moins d&apos;une minute
          </p>
        </header>

        {/* Form */}
        <StoryForm />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center">
          <div className="flex flex-col items-center gap-4">
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
              Fait avec ❤️ pour les parents qui racontent des histoires
            </p>
          </div>
        </footer>
      </div>
    </main>
  )
}
