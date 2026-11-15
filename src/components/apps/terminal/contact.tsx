import type { Command } from '@/lib/terminal-commands'

export const Contact: Command = () => {
  return (
    <p className="[&>a]:underline">
      &gt; Full Name: Haythem Frikha
      <br />
      &gt; Email:{' '}
      <a href="mailto:haythem.frikha@outlook.com">haythem.frikha@outlook.com</a>
      <br />
      &gt; Phone/Whatsapp: <a href="tel:+21654502403">+21654502403</a>
      <br />
      &gt; GitHub:{' '}
      <a href="https://github.com/Flamenate">github.com/Flamenate</a>
      <br />
      &gt; Twitter/X: <a href="https://x.com/0xflamenate">x.com/0xflamenate</a>
      <br />
      &gt; LinkedIn:{' '}
      <a href="https://linkedin.com/in/haythem-frikha">
        linkedin.com/haythem-frikha
      </a>
      <br />
      &gt; Discord:{' '}
      <a href="https://discord.com/users/255792586403479562">@flamenate</a>
    </p>
  )
}
