'use client'
import { useRef, useState } from 'react'
import type { TurnstileHandle } from './Turnstile'

/**
 * Liga um formulário ao widget Turnstile invisível.
 *
 * PORQUE EXISTE
 * O widget é criado com `size: 'invisible'` e `execution: 'execute'` — nesse
 * modo o desafio NÃO corre sozinho: só quando alguém chama `execute()`, e o
 * token chega depois, por callback. Quem se esquecer desse passo fica com o
 * token sempre vazio e leva 403 em todos os pedidos, sem nada no ecrã que
 * explique porquê.
 *
 * Foi o que aconteceu até 28/07/2026 em TRÊS formulários — contacto, newsletter
 * e recursos. Só o de /parcerias chamava `execute()`. Durante esse tempo nenhum
 * contacto e nenhuma subscrição pelo site chegou a lado nenhum: nem email, nem
 * base de dados. Não havia erro nos logs — a route respondia 403 e o site dizia
 * "Verificação de segurança falhou", que se lê como problema do visitante.
 *
 * Este hook existe para essa sequência viver num sítio só. Três cópias de
 * lógica assíncrona é como o bug volta.
 *
 * USO
 *   const gate = useTurnstileGate(async (dados, token) => { ...fetch... })
 *   // no submit:  gate.submeter(dados)
 *   // no widget:  <Turnstile ref={gate.ref} onToken={gate.receberToken}
 *   //               onExpire={gate.limparToken} onError={...} />
 */
export function useTurnstileGate<T>(enviar: (dados: T, token: string) => void | Promise<void>) {
  const ref = useRef<TurnstileHandle>(null)
  const [token, setToken] = useState('')
  const pendente = useRef<T | null>(null)

  // Sempre a versão mais recente do callback: `enviar` costuma fechar sobre
  // estado do componente, e guardá-lo no primeiro render mandaria valores
  // velhos quando o token chegasse.
  const enviarRef = useRef(enviar)
  enviarRef.current = enviar

  /**
   * `enviado`     — havia token válido, o pedido já saiu
   * `a-verificar` — o desafio arrancou; o envio sai quando o token chegar
   * `nao-pronto`  — o widget ainda não carregou (rede lenta, script bloqueado)
   */
  function submeter(dados: T): 'enviado' | 'a-verificar' | 'nao-pronto' {
    if (token) {
      void enviarRef.current(dados, token)
      return 'enviado'
    }
    if (!ref.current?.execute()) return 'nao-pronto'
    pendente.current = dados
    return 'a-verificar'
  }

  function receberToken(novo: string) {
    setToken(novo)
    const dados = pendente.current
    if (dados !== null) {
      pendente.current = null
      void enviarRef.current(dados, novo)
    }
  }

  function limparToken() {
    setToken('')
  }

  /** Descarta um envio à espera. Devolve true se havia algum — serve para o
   *  `onError` do widget não deixar o botão preso em "A enviar…". */
  function cancelarPendente(): boolean {
    const havia = pendente.current !== null
    pendente.current = null
    return havia
  }

  return { ref, submeter, receberToken, limparToken, cancelarPendente }
}
