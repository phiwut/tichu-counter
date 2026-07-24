# Production deployment

The app is built and deployed to GitHub Pages by
`.github/workflows/deploy-pages.yml` whenever `main` changes. The workflow runs
the tests, builds the static SvelteKit site, deploys it, and smoke-tests the
resulting Pages URL. A second workflow checks `https://tichu.xyz` every day.

## One-time recovery for tichu.xyz

The repository automation cannot register or renew a domain. Complete these
steps with the domain registrar and GitHub account that own production:

1. Register or renew `tichu.xyz`.
2. In the GitHub account Pages settings, verify `tichu.xyz` with the TXT record
   GitHub provides.
3. In this repository's **Settings → Pages**, select **GitHub Actions** as the
   source and set the custom domain to `tichu.xyz`.
4. At the DNS provider, create these apex `A` records:

   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

5. Add `www` as a `CNAME` to `phiwut.github.io`. Do not add a wildcard record.
6. After DNS has propagated, enable **Enforce HTTPS** in the repository's Pages
   settings and manually rerun both workflows.

GitHub notes that DNS changes can take up to 24 hours to propagate. The
production check can also be run locally:

```sh
npm run smoke:live
```

Success requires a 2xx response containing the Tichu application shell. DNS,
HTTP, timeout, and unexpected-content failures exit non-zero with a concise
diagnostic.
