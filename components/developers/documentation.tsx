"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ENDPOINTS } from "@/lib/mock/developers-data"

export function Documentation() {
  return (
    <div className="flex gap-6">
      <aside className="w-48 shrink-0">
        <nav className="sticky top-4 space-y-1">
          {ENDPOINTS.map((e) => (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="block rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {e.method} {e.path}
            </a>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 space-y-6">
        {ENDPOINTS.map((endpoint) => (
          <Card key={endpoint.id} id={endpoint.id}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{endpoint.method}</Badge>
                <code className="text-sm font-mono">{endpoint.path}</code>
              </div>
              <p className="text-sm text-muted-foreground">
                {endpoint.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {endpoint.parameters.length > 0 && (
                <div>
                  <CardTitle className="mb-2 text-xs">Parameters</CardTitle>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Required</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {endpoint.parameters.map((p) => (
                        <TableRow key={p.name}>
                          <TableCell className="font-mono text-xs">
                            {p.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {p.type}
                          </TableCell>
                          <TableCell>
                            {p.required ? (
                              <Badge variant="secondary" className="text-xs">
                                Yes
                              </Badge>
                            ) : (
                              <span className="text-muted-foreground text-xs">
                                No
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-xs">
                            {p.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {endpoint.codeSnippets && (
                <div>
                  <CardTitle className="mb-2 text-xs">Code Examples</CardTitle>
                  <Tabs defaultValue="python">
                    <TabsList className="mb-2">
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                    </TabsList>
                    <TabsContent value="python">
                      <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-xs font-mono">
                        {endpoint.codeSnippets.python}
                      </pre>
                    </TabsContent>
                    <TabsContent value="javascript">
                      <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-xs font-mono">
                        {endpoint.codeSnippets.javascript}
                      </pre>
                    </TabsContent>
                    <TabsContent value="curl">
                      <pre className="overflow-x-auto rounded-lg border border-border bg-muted/30 p-4 text-xs font-mono whitespace-pre-wrap">
                        {endpoint.codeSnippets.curl}
                      </pre>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
