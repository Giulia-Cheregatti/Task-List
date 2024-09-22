document.addEventListener('DOMContentLoaded', function() {
    // Referências para elementos da interface
    const taskInput = document.getElementById('taskInput');                           // Campo de entrada para o nome da tarefa
    const taskObservation = document.getElementById('taskObservation');               // Campo de entrada para observações da tarefa
    const addTaskButton = document.getElementById('addTaskButton');                   // Botão para adicionar tarefa
    const taskList = document.getElementById('taskList');                             // Lista de tarefas pendentes
    const completedTaskList = document.getElementById('completedTaskList');           // Lista de tarefas concluídas
    const taskModal = document.getElementById('taskModal');                           // Modal de detalhes da tarefa
    const taskDetails = document.getElementById('taskDetails');                       // Exibe os detalhes da tarefa no modal
    const taskObservationDetails = document.getElementById('taskObservationDetails'); // Exibe as observações da tarefa no modal
    const taskCreationDate = document.getElementById('taskCreationDate');             // Exibe a data de criação da tarefa no modal
    const taskCompletionDate = document.getElementById('taskCompletionDate');         // Exibe a data de conclusão da tarefa no modal
    const span = document.getElementsByClassName('close')[0];                         // Botão para fechar o modal

    // Evento para adicionar uma tarefa
    addTaskButton.addEventListener('click', addTask);

    // Evento para fechar o modal ao clicar no botão de fechar
    span.onclick = function() {
        taskModal.style.display = 'none';
    };

    // Evento para fechar o modal ao clicar fora dele
    window.onclick = function(event) {
        if (event.target == taskModal) {
            taskModal.style.display = 'none';
        }
    };

    // Função para adicionar uma nova tarefa
    function addTask() {
        const taskText = taskInput.value.trim();              // Obtém o texto da tarefa
        const observationText = taskObservation.value.trim(); // Obtém o texto da observação
        const creationDate = new Date().toLocaleString();     // Obtém a data e hora atual
        if (taskText !== "") {                                // Verifica se o texto da tarefa não está vazio
            const li = document.createElement('li');          // Cria um novo item de lista
            li.textContent = taskText;                        // Define o texto do item de lista
            li.dataset.observation = observationText;         // Armazena a observação como atributo de dados
            li.dataset.creationDate = creationDate;           // Armazena a data de criação como atributo de dados
            li.dataset.completionDate = '';                   // Inicializa a data de conclusão como vazia

            // Botão para marcar a tarefa como concluída
            const completeButton = document.createElement('span');
            completeButton.textContent = '✔';
            completeButton.className = 'complete';
            completeButton.onclick = function() {
                moveToCompleted(li); // Move a tarefa para a lista de concluídas
            };

            // Botão para deletar a tarefa
            const deleteButton = document.createElement('span');
            deleteButton.textContent = '✖';
            deleteButton.className = 'delete';
            deleteButton.onclick = function() {
                taskList.removeChild(li); // Remove a tarefa da lista
            };

            // Botão para visualizar os detalhes da tarefa
            const viewButton = document.createElement('span');
            viewButton.textContent = 'ℹ️';
            viewButton.className = 'view';
            viewButton.onclick = function() {
                viewDetails(li); // Abre o modal de detalhes da tarefa
            };

            // Adiciona os botões ao item de lista e insere-o na lista de tarefas
            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            li.appendChild(viewButton);
            taskList.appendChild(li);
            taskInput.value = '';        // Limpa o campo de entrada da tarefa
            taskObservation.value = '';  // Limpa o campo de entrada da observação
        }
    }

    // Função para mover uma tarefa para a lista de concluídas
    function moveToCompleted(taskItem) {
        const completionDate = new Date().toLocaleString(); // Obtém a data e hora atual
        taskItem.dataset.completionDate = completionDate;   // Armazena a data de conclusão

        // Remove os botões de completar, deletar e visualizar da tarefa
        taskItem.querySelectorAll('.complete, .delete, .view').forEach(button => button.remove());

        // Botão para deletar a tarefa da lista de concluídas
        const deleteButton = document.createElement('span');
        deleteButton.textContent = '✖';
        deleteButton.className = 'delete';
        deleteButton.onclick = function() {
            completedTaskList.removeChild(taskItem); // Remove a tarefa da lista de concluídas
        };

        // Botão para visualizar os detalhes da tarefa concluída
        const viewButton = document.createElement('span');
        viewButton.textContent = 'ℹ️';
        viewButton.className = 'view';
        viewButton.onclick = function() {
            viewDetails(taskItem); // Abre o modal de detalhes da tarefa
        };

        // Adiciona os botões ao item de lista e insere-o na lista de concluídas
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(viewButton);
        completedTaskList.appendChild(taskItem);
    }

    // Função para visualizar os detalhes da tarefa no modal
    function viewDetails(taskItem) {
        taskDetails.textContent = 'Task: ' + taskItem.firstChild.textContent.trim();                                      // Exibe o nome da tarefa
        taskObservationDetails.textContent = 'Observation: ' + (taskItem.dataset.observation || 'No observation added.'); // Exibe as observações da tarefa
        taskCreationDate.textContent = 'Created on: ' + taskItem.dataset.creationDate;                                    // Exibe a data de criação
        taskCompletionDate.textContent = 'Completed on: ' + (taskItem.dataset.completionDate || 'Not completed yet');     // Exibe a data de conclusão (se houver)
        taskModal.style.display = 'block';                                                                                // Abre o modal
    }
});

const toggleButton = document.getElementById('toggle-mode');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Salvar a preferência do usuário no localStorage
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
});

// Carregar a preferência do usuário ao iniciar
if (localStorage.getItem('darkMode') === 'true') {
  document.body.classList.add('dark-mode');
}