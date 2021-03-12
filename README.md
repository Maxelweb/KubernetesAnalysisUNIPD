# Kubernetes-RCD

Kubernetes analysis, Runtimes for Concurrency and Distribution course, Computer Science (UNIPD) 2021


## Ansible guide

- Ansible module apt: https://docs.ansible.com/ansible/latest/collections/ansible/builtin/apt_module.html
- Ansible module tutorial (video): https://www.youtube.com/watch?v=57gAqKvAKck

1. Install OS and basic config with openssh + SSH key saved for root or another user with sudo permissions
2. Create an inventory with the local nodes
3. Define a `.vault_pass` (do not save it in git) --> used to encrypt or decrypt vault, where there are important vars like password etc.
4. Use `ansible-vault edit` to edit the vault without encrypting and decrypting each time
5. Use `ansible <cluster name> -m <module name> -a <arguments>`
	- Using **playbooks** we can define multiple actions to execute with proper modules (ex. apt module for update)


