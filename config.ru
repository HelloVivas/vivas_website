use Rack::Static,
  :urls => ["/images", "/js", "/css"],
  :root => "public"

route = {
          "/" => 'index.html',
          "/press.html" => 'press.html'
        }

run lambda { |env|
  path = route[env["REQUEST_PATH"]] || 'index.html'
  [
    200,
    {
      'Content-type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open("public/#{path}", File::RDONLY)
  ]
}
