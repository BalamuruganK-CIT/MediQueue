import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { resourceLibrary } from "@/lib/mock-data"
import { Search, Film, Newspaper } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ResourceLibraryPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resource Library</h1>
        <p className="text-muted-foreground">Browse articles, videos, and guides to learn more about your health.</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search for topics like 'heart health', 'diabetes'..." className="pl-10" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resourceLibrary.map((resource) => (
          <Card key={resource.id} className="overflow-hidden flex flex-col">
            <Link href={resource.link} className="block hover:opacity-90 transition-opacity">
              <Image
                src={resource.imageUrl}
                alt={resource.title}
                width={600}
                height={400}
                className="aspect-video w-full object-cover"
                data-ai-hint={
                  resource.id === 'r1' ? 'heart health' :
                  resource.id === 'r2' ? 'healthy food' :
                  resource.id === 'r3' ? 'yoga meditation' :
                  resource.id === 'r4' ? 'diabetes care' :
                  resource.id === 'r5' ? 'sleep relaxation' :
                  'meditation peace'
                }
              />
            </Link>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                {resource.category === "Video" ? <Film className="h-4 w-4" /> : <Newspaper className="h-4 w-4" />}
                <span>{resource.category}</span>
              </div>
              <CardTitle className="text-lg flex-grow">
                <Link href={resource.link} className="hover:underline">
                  {resource.title}
                </Link>
              </CardTitle>
              <CardDescription className="mt-2 text-sm">
                {resource.description}
              </CardDescription>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
